<script lang="ts">
  export let task
  let isEditing = false
  let message = ''
  let isLoading = false

  async function handleUpdate(event: Event) {
    isLoading = true
    const formData = new FormData(event.target as HTMLFormElement)
    
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        body: new URLSearchParams(formData as any)
      })

      if (response.ok) {
        const updatedTask = await response.json()
        task = updatedTask
        isEditing = false
        message = 'Task updated successfully!'
      } else {
        message = 'Error updating task'
      }
    } catch (error) {
      message = 'Network error'
    } finally {
      isLoading = false
    }
  }

  async function toggleComplete() {
    const formData = new FormData()
    formData.append('completed', (!task.completed).toString())
    
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        body: new URLSearchParams(formData as any)
      })
      
      if (response.ok) {
        const updatedTask = await response.json()
        task = updatedTask
      }
    } catch (error) {
      console.error('Update failed:', error)
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        location.reload()
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }
</script>

<div class="p-4 border rounded-lg bg-white shadow-sm">
  {#if isEditing}
    <form
      on:submit|preventDefault={handleUpdate}
      class="space-y-4"
    >
      <input
        name="title"
        value={task.title}
        placeholder="Title"
        class="w-full p-2 border rounded"
      />
      
      <textarea
        name="description"
        value={task.description}
        placeholder="Description"
        class="w-full p-2 border rounded"
      />
      
      <select
        name="priority"
        value={task.priority}
        class="w-full p-2 border rounded"
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      
      <input
        type="datetime-local"
        name="dueDate"
        value={new Date(task.dueDate).toISOString().slice(0, 16)}
        class="w-full p-2 border rounded"
      />
      
      <div class="flex gap-2">
        <button
          type="submit"
          class="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          on:click={() => isEditing = false}
          class="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
      </div>
      
      {#if message}
        <p class="text-sm text-red-600">{message}</p>
      {/if}
    </form>
  {:else}
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-semibold">{task.title}</h3>
        <p class="text-gray-600">{task.description}</p>
        <p class="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        <span class={`px-2 py-1 rounded-full text-sm ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>
      <div class="flex gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          on:change={toggleComplete}
          class="h-6 w-6"
        />
        <button
          on:click={() => isEditing = true}
          class="text-yellow-600 hover:text-yellow-700"
        >
          Edit
        </button>
        <button
          on:click={handleDelete}
          class="text-red-600 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  {/if}
</div>

