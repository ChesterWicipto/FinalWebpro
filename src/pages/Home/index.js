import React, { useEffect } from 'react'
import {Card, CardContent, CardActions} from '@material-ui/core'
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import { Paper, Button } from '@material-ui/core'
import { useState } from 'react'
import firebase from '../../config/firebase'

function Home() {
    const [productsData, setProductsData] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])

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

    const alertTotalBiaya = () => {
        console.log(selectedProduct)
        let totalBiaya = 0

        selectedProduct.forEach(el => {
            totalBiaya += el.price
        })

        alert(`Total biaya dari produk-produk yang anda pilih adalah Rp. ${totalBiaya}`)
    }

    const resetPilihan = () => {
        setSelectedProduct([])
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
                        <Typography variant='h3' style={{padding: 25}}>Menu</Typography>
                    </div>
                    <div style={{paddingRight: 100, paddingLeft: 100, paddingTop: 25}}>
                        <div style={{display: 'flex'}}>
                            <div style={{flex: 1}}></div>
                            <Button variant='contained' style={{padding: 10, margin: 15}} onClick={resetPilihan}>Reset Pilihan</Button>
                        </div>
                        <TableContainer component={Paper} style={{backgroundColor: '#F0F0F0'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productsData.map((el, idx) => 
                                        <TableRow key={idx} style={{backgroundColor: selectedProduct.includes(el) ? '#E0E0E0' : 'white'}}>
                                            <TableCell>{el.product}</TableCell>
                                            <TableCell>{el.price}</TableCell>
                                            <TableCell>
                                                <Button variant='contained' style={{backgroundColor: 'orange'}} onClick={() => {
                                                    setSelectedProduct(prevState => {
                                                        if(!selectedProduct.includes(el)) {
                                                            return [...selectedProduct, el]
                                                        } else {
                                                            return selectedProduct
                                                        }
                                                    })
                                                }}>Select</Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Button variant='contained' style={{backgroundColor: '#B3E0FF', width: '100%', marginTop: 25, height: 80, fontSize: 18}} onClick={alertTotalBiaya}>Buy</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Home
