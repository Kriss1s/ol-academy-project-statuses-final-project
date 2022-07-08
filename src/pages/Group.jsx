import { useParams } from 'react-router-dom';
export default function Group() {
  let params = useParams();
  return <div>{params}</div>;
}
