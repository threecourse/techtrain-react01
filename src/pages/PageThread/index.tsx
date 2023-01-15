import {useEffect, useState} from "react";
import axios from "axios";
import {PostCreateRequest, PostData, ThreadData} from "openapi";
import {useAppRouteParams} from "route";
import {TopNav} from "../../components/TopNav";
import {rootStyle} from "../common";
import {
    boxStyle,
    boxTextStyle,
    columnLeftStyle,
    columnRightStyle,
    contentPageThreadStyle,
    submitButtonStyle,
    textBoxStyle, textStyle
} from "./style";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchPost = async (threadId: string): Promise<PostData[]> => {
    const url = `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threadId}/posts`

    return await axios.get(url)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .then((response) => {return response.data.posts as PostData[]})
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchPostDummy = async (threadId: string): Promise<PostData[]> => {
    await new Promise(resolve => setTimeout(resolve, 50))

    return [ {id:"0", post: "ポスト0" },  {id:"1", post: "ポスト1"},  {id:"2", post: "ポスト2"} ]
}

export const PageThread: React.FC = () => {

    const { threadId } = useAppRouteParams();
    const [threadPosts, setThreadPosts] = useState<PostData[]>([])
    const [threadDataList, setThreadDataList] = useState<ThreadData[]>([])

    // TODO: useEffectの使い方の確認
    // NOTE: 最初の10件しか取得していない
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPostDummy(threadId)
            setThreadPosts(data)
        }
        void fetchData()
    }, [threadId]);

    // NOTE: タイトル取得のためにスレッド一覧を取得する（本来は状態として保持すべき？）
    useEffect(() => {
        void axios.get("https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads")
            .then((response) => setThreadDataList(response.data as ThreadData[]))
    }, []);

    const [textValue, setTextValue] = useState("")
    const onClick = () => {

        // NOTE: ダミーのPost
        if (textValue !== ""){
            const request: PostCreateRequest =  { post: textValue }
            alert(`投稿します。Request: ${JSON.stringify(request)}`)
        }
        else{
            alert(`投稿を入力して下さい`)
        }
    }

    type boxProps = {
        index: number,
        postData: PostData
    }
    const Box: React.FC<boxProps> = (props: boxProps) => {
        const {postData} = props

        return (
            <div style={boxStyle}>
                <div style={boxTextStyle}>{postData.post}</div>
            </div>
        )
    }

    const threadTitle = threadDataList.find(threadData => threadData.id === threadId)?.title

    return (
        <div style={rootStyle}>
            <TopNav hasCreateThreadLink={true}/>
            <div style={contentPageThreadStyle}>
                <div style={columnLeftStyle}>
                    <div style={{...textStyle}}>
                        {threadTitle}
                    </div>
                    {
                        threadPosts.map((threadData, index) =>
                            <Box postData={threadData} index={index} key={index}/>)
                    }
                </div>
                <div style={columnRightStyle}>
                    <input type="text" style={textBoxStyle} onChange={(e) => setTextValue(e.target.value)}></input>
                    <button style={submitButtonStyle} onClick={onClick}>投稿</button>
                </div>
            </div>
        </div>
    )
}