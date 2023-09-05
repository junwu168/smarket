import React, { useState, useEffect } from 'react';
import { getProduct } from '../utils';
import { Avatar, List, Button } from 'antd';



function SellingOverview() {
  const [sellingList, setSellingList]=useState([]);
  const [soldList, setSoldList]=useState([]);
  const [unsoldCount, setUnsoldCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);

  const sellingListHandler = () =>{
    const newItem = {id: sellingList.length+1, title:'new item'};
    setSellingList(prevList => [...prevList, newItem]);
    setActiveCount(prevCount => prevCount + 1);
    setUnsoldCount(prevCount => prevCount + 1);
  };


  const deleteHandler = itemId =>{
    setSellingList(prevList => prevList.filter(item=> item.id!=itemId));
    setActiveCount(prevCount => prevCount - 1);
    setUnsoldCount(prevCount => prevCount - 1); 
  };

  const editHandler = itemId =>{

  };


  return (
    <div className="selling-overview" 
      style={{
        display: 'column',
        flex: '1',

      }}>
      <h2>My Selling Overview</h2>
      <div 
        className="item-count-container"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        
        <p 
          className="item-sold"
          style={{
            fontSize:'20px',
          }}
        >Sold: {soldCount}</p>
        <p 
          className="item-active"
          style={{
            fontSize:'20px',
          }}
          >Active: {activeCount}</p>
        <p 
          className="item-unsold"
          style={{
            fontSize:'20px',
          }}
          >Unsold: {unsoldCount}</p>
        <Button
            key="list"
            type='primary'
            size='large'
            onClick={sellingListHandler}
            style={{
                backgroundColor: '#2B60DE',
                color: 'white',
              }}
        >   
        List an Item
        </Button>
    
      </div>
      <h3>Unsold:</h3>
      <List
        className="selling-items" 
        itemLayout="horizontal"
        dataSource={sellingList}
        renderItem={(product, index) => (
          <List.Item 
          key={product.id}
        
          actions={[
            <Button 
                key="edit"
                style={{backgroundColor:'#2B60DE',color:'white'}}
                onClick={()=> editHandler(product.id)}
            >
            Edit
            </Button>,
            <Button 
                key="delete"
                style={{backgroundColor:'red',color:'white'}}
                onClick={() => deleteHandler(product.id)}
            >
            Delete
            </Button>,
          ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={product.thumbnail} size={128}/>}
              title={product.title}
              description={product.description}
            />
          </List.Item>
        )}
      />
      <h3>Sold:</h3>
      <List
        className='sold-items'
        itemLayout="horizontal"
        dataSource={soldList}
        >
      </List>
    </div>
  );
}

export default SellingOverview;
