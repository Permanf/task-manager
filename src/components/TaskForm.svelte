<script lang="ts">
  
  let title = ''
  let description = ''
  let priority = 'MEDIUM'
  let dueDate = ''
  let completed = false
  let isLoading = false
  let message = ''

  
  async function handleSubmit(event: Event) {
  isLoading = true
  message = ''

  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (result?.success) {
      title = ''
      description = ''
      priority = 'MEDIUM'
      dueDate = ''
      completed = false
      message = 'Task created successfully!'
    } else {
      message = result?.error || 'Failed to create task'
    }
  } catch (error) {
    message = 'Error creating task'
  } finally {
    isLoading = false
  }
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md"
>
  <div class="space-y-2">
    <input
      name="title"
      bind:value={title}
      placeholder="Title"
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    
    <textarea
      name="description"
      bind:value={description}
      placeholder="Description"
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      rows="3"
    />
    
    <select
      name="priority"
      bind:value={priority}
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="LOW">Low</option>
      <option value="MEDIUM">Medium</option>
      <option value="HIGH">High</option>
    </select>
    
    <input
      type="datetime-local"
      name="dueDate"
      bind:value={dueDate}
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <label class="flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50">
      <input
        type="checkbox"
        name="completed"
        bind:checked={completed}
        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span class="text-sm text-gray-700">Mark as completed</span>
    </label>
  </div>

  <div class="flex items-center gap-4">
    <button
      type="submit"
      class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
      disabled={isLoading}
    >
      {isLoading ? 'Creating...' : 'Create Task'}
    </button>
    
    {#if message}
      <p class="text-sm {message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}">
        {message}
      </p>
    {/if}
  </div>
</form>