import { useNavigate, useParams } from "react-router-dom";
// import { articles } from "./ArticleContent";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdOutlineArrowBackIos } from "react-icons/md";
import CommentsList from "../components/CommentsList";

function ArticlePage() {
    const { articleId } = useParams();
    const nav = useNavigate();
    const [articleDetails, setArticleDetails] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const upvoteArticle = async () => {
        if (!isLiked) {
            setIsLoading(true);
            setIsLiked(true);
            const res = await axios.put(`/api/articles/${articleId}/upvote`);
            setArticleDetails({
                ...articleDetails,
                upvotes: res.data.upvotes
            })
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const res = await axios.get(`/api/articles/${articleId}`);
            setArticleDetails(res.data);
            console.log(res.data);
            setIsLoading(false);
        }
        loadData();
    }, [articleId])
    // const article = articles.find((item) => item.name === articleId)

    return (
        <>
            {isLoading ? <h4>isLoading...</h4> :
                <div>
                    <div>
                        <button onClick={() => { upvoteArticle() }} disabled={isLiked}>
                            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
                        </button> {articleDetails.upvotes} upvote(s)
                    </div>
                    <h1>
                        <MdOutlineArrowBackIos style={{ cursor: 'pointer' }} onClick={() => { nav("/articles") }} />
                        {articleDetails.title}
                    </h1> {articleDetails.content.map((item, i) => {
                        return <p key={i}>
                            {item}
                        </p>
                    })}

                    <div>
                        <CommentsList comments={articleDetails.comments} />
                    </div>
                </div>
            }
        </>
    );
}

export default ArticlePage;