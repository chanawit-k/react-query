import { useState } from 'react'
import { useCreateTask } from './reactQueryCustomHook'
const Form = () => {
  const [newItemName, setNewItemName] = useState('')
  const { createTask, isLoading } = useCreateTask()
  const handleSubmit = async (e) => {
    e.preventDefault()
    createTask(newItemName, {
      onSuccess: () => {
        console.log('out file ')
        setNewItemName('')
      },
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn" disabled={isLoading}>
          add task
        </button>
      </div>
    </form>
  )
}
export default Form
