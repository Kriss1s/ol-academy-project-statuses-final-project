import { useState, useEffect } from 'react';
export default function Color({ id, color, meaning, newGroup, setNewGroup }) {
  const [newColor, setNewColor] = useState(color);
  const [colorMeaning, setColorMeaning] = useState(meaning);

  useEffect(() => {
    const saveMeaning = () => {
      const newMeanings = [...newGroup.statuses];
      newMeanings.forEach(item => {
        if (item.id === id) {
          item.meaning = colorMeaning;
        }
      });
      setNewGroup({ ...newGroup, statuses: [...newMeanings] });
    };
    saveMeaning();
    // eslint-disable-next-line
  }, [colorMeaning]);
  useEffect(() => {
    const saveNewColor = () => {
      const newColors = [...newGroup.statuses];
      newColors.forEach(item => {
        if (item.id === id) {
          item.color = newColor;
        }
      });
      setNewGroup({ ...newGroup, statuses: [...newColors] });
    };
    saveNewColor();
    // eslint-disable-next-line
  }, [colorMeaning]);

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
            id === 100
              ? `Default`
              : id === 200
              ? 'Check'
              : id === 300
              ? 'Improve'
              : id === 400
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
