import React from 'react'
import Client from '../components/Client'

export default function Page({ params }: { params: { key: string } }) {

    const key = params.key == "root" ? null : params.key

    return (
        <Client parent_UID={key} />
    )
}
