import useThemeMode from '@/components/mode-toggle/use-theme-mode';
import { theme } from 'antd';


export default function DemoPieCharts() {

    const { token: { colorPrimary, colorBorder, colorText } } = theme.useToken()

    const { mode } = useThemeMode();


    // const config: PieConfig = {
    //     data: dataTest,
    //     axis: {
    //         x: { labelFontFamily: "IRANSansfanum" },
    //         y: { labelFontFamily: "IRANSansfanum" },
    //     },
    //     theme: mode == "dark" ? "classicDark" : "classic",
    //     angleField: 'value',
    //     colorField: 'type',
    //     innerRadius: 0.5,
    //     loading: false,
    //     loadingTemplate: <Spin />,
    //     containerStyle: { direction: "ltr", fontFamily: "IRANSansfanum" },
    //     label: {
    //         text: 'value',
    //         style: {
    //             fontWeight: 'bold',
    //             fontFamily: "IRANSansfanum"
    //         },
    //     },
    //     legend: {
    //         color: {
    //             itemLabelFill: colorText,
    //             itemLabelFontFamily: "IRANSansfanum",
    //             position: 'top',
    //             layout: {
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 flexDirection: 'column',
    //             },
    //         },
    //     },
    //     annotations: [
    //         {
    //             tooltip: false,
    //             type: 'text',
    //             style: {
    //                 text: "چارت گزارشی",
    //                 fill: colorText,
    //                 x: '50%',
    //                 y: '50%',
    //                 textAlign: 'center',
    //                 fontSize: 14,
    //                 fontStyle: 'bold',
    //                 fontFamily: "IRANSansfanum",
    //             },
    //         },
    //     ],
    //     tooltip: {
    //         title: 'type',
    //     },
    //     interaction: {
    //         tooltip: {
    //             render: (e: React.MouseEvent, { items, index }: { items: { name: string, value: number, color: string }[], index: number }) => {
    //                 return (
    //                     <div dir='rtl' key={index} style={{ fontFamily: "IRANSansfanum", color: colorText }}>
    //                         {items.map((item, index) => {
    //                             const { name, value, color } = item;
    //                             return (
    //                                 <div key={index} style={{ color: colorText }}>
    //                                     <div className='flex items-center justify-between lg:text-base gap-1.5'>
    //                                         <div className='flex justify-center items-center gap-1.5'>
    //                                             <span
    //                                                 className='inline-block size-2 rounded-full'
    //                                                 style={{ backgroundColor: color }}
    //                                             ></span>
    //                                             <span>مقدار</span>
    //                                         </div>
    //                                         <b>{value}</b>
    //                                     </div>
    //                                 </div>
    //                             );
    //                         })}
    //                     </div>
    //                 );
    //             },
    //         },
    //     },
    // };

    // return (
    //     <Card>
    //         <Pie {...config} />
    //     </Card>
    // )

    return <></>
}


// type dataTestProps = {
//     type: string,
//     value: number,
// }

// const dataTest: dataTestProps[] = [
//     { type: 'اشخاص', value: 19 },
//     { type: 'شرکت ها', value: 25 },
//     { type: 'پروژه ها', value: 12 },
//     { type: 'گزارشات', value: 3 },
// ]
