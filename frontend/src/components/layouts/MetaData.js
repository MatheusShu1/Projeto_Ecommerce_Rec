import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - Eletronica Elisson - Melhores preços em eletrônicos`}</title>
        </Helmet>
    )
}

export default MetaData
