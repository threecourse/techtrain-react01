import {useEffect, useState} from "react";
import axios from "axios";
import {ThreadData} from "openapi";
import {useNavigate} from "react-router";
import {TopNav} from "../../components/TopNav";
import {rootStyle} from "../common";
import {contentStyle, boxStyle, boxTextStyle, textTitleStyle} from "./style";

export const PageTop: React.FC = () => {
    const [threadDataList, setThreadDataList] = useState<ThreadData[]>([])
    const navigate = useNavigate()

    // TODO: useEffectの使い方の確認
    useEffect(() => {
        void axios.get("https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads")
            .then((response) => setThreadDataList(response.data as ThreadData[]))
    }, []);

    type ThreadBoxProps = {
        index: number,
        threadData: ThreadData
    }

    const ThreadBox: React.FC<ThreadBoxProps> = (props: ThreadBoxProps) => {
        const {threadData} = props

        const onClick = () => {
            const id = threadData.id
            if (id != null){
                navigate(`/thread/${id}`)
            }
        }

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div style={boxStyle} onClick={onClick}>
                <div style={boxTextStyle}>{threadData.title}</div>
            </div>
        )
    }

    return (
        <div style={rootStyle}>
            <TopNav hasCreateThreadLink={true}/>
            <div style={contentStyle}>
                <div style={textTitleStyle}>
                    新着スレッド
                </div>
                {
                    threadDataList.map((threadData, index) =>
                        <ThreadBox threadData={threadData} index={index} key={index}/>)
                }
            </div>
        </div>
    )
}