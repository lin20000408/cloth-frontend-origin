import React, { useEffect } from 'react';
import { useShip711StoreOpener } from '@/hooks/use-ship-711-store';
import { Input } from 'antd';

export default function SevenElevenApi({ onStoreSelect }) {
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    'http://localhost:3005/api/shipment/711',
    { autoCloseMins: 3 }
  );

  useEffect(() => {
    if (store711 && onStoreSelect) {
      onStoreSelect(store711);
    }
  }, [store711, onStoreSelect]);

  return (
    <>
      <img
        src="/LOGO.png"
        alt="LOGO"
        style={{ width: '45px', height: '45px', marginRight: '20px' }}
      />
      <button
        type="button"
        onClick={openWindow}
        style={{
          border: '3px solid #ABC8BC',
          color:'black',
          borderRadius:"5px",
          background:'white'
        }}
      >
        選擇門市
      </button>
      <br />
      <br />
    </>
  )
}
