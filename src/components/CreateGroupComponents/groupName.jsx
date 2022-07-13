export default function GroupName({
  groupNames,
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
          setNewGroup({
            ...newGroup,
            id: (groupNames.length + 1) * 1000,
            groupName: e.target.value,
          });
        }}
      ></input>
      {isNameError && <p className='name-error'>Choose another name</p>}
    </>
  );
}
