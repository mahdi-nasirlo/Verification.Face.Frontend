import { Popconfirm } from "antd"
import { useDelete } from "../hooks/Face/useDelete"

interface FileWrapperType { children: React.ReactNode, key?: number, face_UID: string, parent_UID?: string | null }

const FileWrapper = ({ children, face_UID, parent_UID }: FileWrapperType) => {

    const { mutateAsync } = useDelete()

    const onConfirm = () => mutateAsync({ face_UID, parent_UID })

    return <Popconfirm title="حذف عکس" description={"آیا از حذف عکس مطمئن هستید؟"} onConfirm={onConfirm} trigger="hover" >{children}</Popconfirm>
}

export { FileWrapper }