// the current filter active if
// the selection !== the defaults

export default function isNumberFilterActive(selection, defaults){
  return (selection[0] === defaults[0] && selection[1] === defaults[1]) ? false : true
}