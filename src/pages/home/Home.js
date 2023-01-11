import React, { useEffect } from 'react'
import { axiosClient } from '../../utils/axiosClient'

function Home() {

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axiosClient.get('/posts/all');
      console.log('got the response', response)
    } catch (e) {
      console.log('homeeeeeeeee',e)
    }
  }

  return (
    <div>Home</div>
  )
}

export default Home