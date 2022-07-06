// import { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import { onValue, ref, set } from 'firebase/database';
// export default function AddPage() {
//   const [currentClass, setCurrentClass] = useState('');
//   const [classes, setClasses] = useState([]);
//   const handleCurrentClassChange = e => {
//     const name = e.target.value;
//     setCurrentClass(name);
//   };

//   const writeToDatabase = () => {
//     set(ref(db, `${currentClass}/`), { students: { student: `test` } });
//     return setCurrentClass('');
//   };
//   useEffect(() => {
//     // console.log(classes);
//     onValue(ref(db), snapshot => {
//       const data = snapshot.val();
//       console.log(Object.values(data));
//       if (data !== null) {
//         setClasses([...Object.values(data)]);
//       }
//     });
//   }, []);

//   return (
//     <>
//       <input
//         type='text'
//         value={currentClass}
//         onChange={handleCurrentClassChange}
//       />
//       <button onClick={writeToDatabase}>submit</button>
//       {classes.map(item => {
//         return <p>{item.students.student}</p>;
//       })}
//     </>
//   );
// }
