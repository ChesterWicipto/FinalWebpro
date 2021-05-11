import React, { useEffect } from 'react'
import {Card, CardContent, CardActions} from '@material-ui/core'
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import { Paper, Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import firebase from '../../config/firebase'
import {v4 as uuidv4} from 'uuid'

function Owner() {
    const [productsData, setProductsData] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')

    const getProductsData = () => {
        firebase.database().ref('product').get()
            .then(snapshot => {
                if(snapshot.exists()) {
                    const raw = snapshot.val()
                    let data = []

                    Object.keys(raw).map(el => {
                        data.push(raw[el])
                    })

                    setProductsData(data)
                    console.log(data)
                } else {
                    alert("Error getting snapshot of products data")
                }
            })
            .catch(error => {
                alert(error.message)
            })
    }

    const simpanProdukKeBackend = () => {
        firebase.database().ref(`product/${uuidv4()}`).set({
            price: productPrice,
            product: productName
        })
        .then(() => {
            setProductName('')
            setProductPrice('')
        })
        .catch(error => {
            alert(error.message)
        })
    }

    useEffect(() => {
        getProductsData()
    }, [])

    return (
        <div style={{
            backgroundColor: 'grey',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Card style={{width: 1600, height: 800}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <div style={{backgroundColor: '#B3E0FF'}}>
                        <Typography variant='h3' style={{padding: 25}}>Buat Produk</Typography>
                    </div>
                    <div style={{paddingRight: 100, paddingLeft: 100, paddingTop: 25, display: 'flex', flexDirection: 'column'}}>
                        
                        <div style={{height: 25}}/>
                        <TextField variant='outlined' label='Nama Produk' value={productName} onChange={e => setProductName(e.target.value)}/>
                        <div style={{height: 25}}/>
                        <TextField variant='outlined' label='Harga Produk' value={productPrice} onChange={e => setProductPrice(parseInt(e.target.value))}/>
                        <div style={{height: 25}}/>

                        <Button variant='contained' style={{backgroundColor: '#B3E0FF', width: '100%', marginTop: 25, height: 80, fontSize: 18}} onClick={simpanProdukKeBackend}>Save</Button>
                        <div style={{height: 25}}/>
                        <TableContainer component={Paper} style={{backgroundColor: '#F0F0F0'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productsData.map((el, idx) => 
                                        <TableRow key={idx} style={{backgroundColor: selectedProduct.includes(el) ? '#E0E0E0' : 'white'}}>
                                            <TableCell>{el.product}</TableCell>
                                            <TableCell>{el.price}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Owner
