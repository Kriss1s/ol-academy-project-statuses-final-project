export default function GroupName({
  newGroup,
  setNewGroup,
  isNameError,
  setIsNameError,
}) {
  return (
    <>
      <label htmlFor='group-name'>Group Name</label>
      <input
        className='group-name'
        name='group-name'
        type='text'
        value={newGroup.groupName}
        placeholder='Group Name'
        onChange={e => {
          setIsNameError(false);
          setNewGroup({ ...newGroup, groupName: e.target.value });
        }}
      ></input>
      {isNameError && <p className='name-error'>Choose another name</p>}
    </>
  );
}
