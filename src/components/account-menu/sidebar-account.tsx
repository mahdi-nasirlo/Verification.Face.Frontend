import { Avatar, Tag, Typography, theme } from 'antd';
import Link from 'next/link';


export default function SidebarAccount() {

    const { token: { colorWarningBg } } = theme.useToken();


    return (
        <div className="grid w-full min-h-16 md:min-h-20">
            <Link href={"/dashboard"} className="flex items-center gap-3 justify-start flex-row-reverse px-3 py-2 rounded-md bg-secondary">
                <Avatar size={48} src="" />
                <div className="flex flex-col items-end">
                    <Typography className="font-bold text-lg text-primary">
                        علیرضا صاحب سبک
                    </Typography>
                    <span>
                        <Tag color={colorWarningBg} className="rounded-3xl" >
                            ادمین
                        </Tag>
                    </span>
                </div>
            </Link>
        </div>
    )
}

