// Calculate how many items are completed vs the total number of items in a list
export function calcListCompletion(list) {
  const completed = list.filter((item) => item.completed).length
  const total = list.length
  return [completed, total]
}
