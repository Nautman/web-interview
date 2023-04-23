export function calcListCompletion(list) {
  const completed = list.filter((item) => item.completed).length
  const total = list.length
  return [completed, total]
}
