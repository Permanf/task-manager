<script lang="ts">
  import TaskItem from './TaskItem.svelte'
  export let tasks = []
  let filterPriority = 'all'
  let filterCompleted = 'all'

  const filteredTasks = () => tasks.filter(task => {
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority
    const completedMatch = filterCompleted === 'all' || 
      (filterCompleted === 'completed' ? task.completed : !task.completed)
    return priorityMatch && completedMatch
  })
</script>

<div class="space-y-4">
  <div class="flex gap-4 mb-4">
    <select bind:value={filterPriority} class="p-2 border rounded">
      <option value="all">All Priorities</option>
      <option value="LOW">Low</option>
      <option value="MEDIUM">Medium</option>
      <option value="HIGH">High</option>
    </select>

    <select bind:value={filterCompleted} class="p-2 border rounded">
      <option value="all">All Statuses</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>
  </div>

  {#each filteredTasks() as task (task.id)}
    <TaskItem {task} />
  {/each}
</div>