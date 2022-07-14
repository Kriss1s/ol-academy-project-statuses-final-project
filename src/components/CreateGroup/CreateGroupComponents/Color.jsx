import { useState, useEffect } from 'react';

export default function Color({ id, color, meaning, newGroup, setNewGroup }) {
  const [newColor, setNewColor] = useState(color);
  const [colorMeaning, setColorMeaning] = useState(meaning);

  useEffect(() => {
    const saveMeaning = () => {
      const newMeanings = [...newGroup.statuses];
      console.log(newMeanings);
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
      console.log(newColors);
      newColors.forEach(item => {
        if (item.id === id) {
          item.color = newColor;
        }
      });
      setNewGroup({ ...newGroup, statuses: [...newColors] });
    };
    saveNewColor();
    // eslint-disable-next-line
  }, [newColor]);

  const placeholder =
    id === 100
      ? `Default`
      : id === 200
      ? 'Check'
      : id === 300
      ? 'Improve'
      : id === 400
      ? 'Done'
      : '';
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
          placeholder={placeholder}
          onChange={e => {
            setColorMeaning(e.target.value);
          }}
        />
      </div>
    </>
  );
}
