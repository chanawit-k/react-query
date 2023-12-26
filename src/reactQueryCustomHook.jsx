import { useQuery } from '@tanstack/react-query'
import customFetch from './utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
export const useAllTask = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['taskList'],
    queryFn: async () => {
      const { data } = await customFetch.get('/')
      return data
    },
  })
  return { data, isError, isLoading }
}
export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskList'] })
      toast.success('Added Success')
    },
    onError: (error) => {
      toast.error(error.response.data.msg)
    },
  })
  return { createTask, isLoading }
}

export const useEditTask = () => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: ({ id, isDone }) => {
      return customFetch.patch(`/${id}/`, {
        isDone: !isDone,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskList'] })
    },
  })
  return { editTask }
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteTask } = useMutation({
    mutationFn: (id) => {
      return customFetch.delete(`/${id}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskList'] })
    },
  })
  return { deleteTask }
}
