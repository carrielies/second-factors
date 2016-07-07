import React from 'react'
import carousel from '../components/carousel'
import Search from '../helpdesk/search'

export default function() {
    return (
        <Carousel pages={[
            {page: <Search/>, data:{}}
        ]}/>
    )
}