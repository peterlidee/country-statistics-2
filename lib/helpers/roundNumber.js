// rounds the number
// or returns empty one
export default function roundNumber(num){
  if(num === '') return num;
  if(num < 0) return 0;
  // if(num < 1) return (Math.round(num * 10))/10;
  return Math.round(num);
}