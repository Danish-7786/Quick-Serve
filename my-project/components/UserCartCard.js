import React from 'react'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';
const UserCartCard = () => {
  return (
  
        <MDBCard className='flex' style={{ maxWidth: '540px' }}>
          <MDBRow className='g-0'>
            <MDBCol >
              <MDBCardImage className='h-10 object-cover ' src='' alt='...' fluid />
            </MDBCol>
            <MDBCol >
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This
                  content is a little bit longer.
                </MDBCardText>
                <MDBCardText>
                  <small className='text-muted'>Last updated 3 mins ago</small>
                </MDBCardText>
              </MDBCardBody>
            </MDBCol>
    
    
          </MDBRow>
        </MDBCard>
      
    
    
  
  )
}

export default UserCartCard