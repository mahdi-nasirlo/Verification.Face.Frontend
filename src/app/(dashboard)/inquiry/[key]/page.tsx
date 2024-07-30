import React from 'react'
import Client from './components/Client'

export default function Page({ params }: { params: { key: string } }) {
    return (
        <Client face_UID={params.key} />
    )
}
