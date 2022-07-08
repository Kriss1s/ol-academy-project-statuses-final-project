import { useState, useEffect } from 'react';
export default function Color({ id, color, meaning, newGroup, setNewGroup }) {
  const [newColor, setNewColor] = useState(color);
  const [colorMeaning, setColorMeaning] = useState(meaning);
  useEffect(() => {
    saveMeaning();
  }, [colorMeaning]);
  useEffect(() => {
    saveNewColor();
  }, [newColor]);
  const saveNewColor = () => {
    const newColors = [...newGroup.statuses];
    newColors.forEach(item => {
      if (item.id === id) {
        item.color = newColor;
      }
    });
    setNewGroup({ ...newGroup, statuses: [...newColors] });
  };
  const saveMeaning = () => {
    const newMeanings = [...newGroup.statuses];
    newMeanings.forEach(item => {
      if (item.id === id) {
        item.meaning = colorMeaning;
      }
    });
    setNewGroup({ ...newGroup, statuses: [...newMeanings] });
  };
  return (
    <>
      <div className='color-wrapper'>
        <input
          className='color'
          type='color'
          value={newColor}
          onChange={e => {
            setNewColor(e.target.value);
          }}
        />
        <input
          className='color-meaning'
          type='text'
          value={colorMeaning}
          placeholder={
            id === 1
              ? `Default`
              : id === 2
              ? 'Check'
              : id === 3
              ? 'Improve'
              : id === 4
              ? 'Done'
              : ''
          }
          onChange={e => {
            setColorMeaning(e.target.value);
          }}
        />
      </div>
    </>
  );
}
