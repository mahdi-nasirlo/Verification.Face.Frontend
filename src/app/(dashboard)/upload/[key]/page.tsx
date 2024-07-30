import Client from './components/Client'

export default function Page({ params }: { params: { key: string } }) {
    return (
        <Client folder_UID={params.key} />
    )
}
