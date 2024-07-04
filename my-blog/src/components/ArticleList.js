import { Link } from "react-router-dom";

const ArticleList = ({articles}) => {
    return ( <div>
    {articles.map((item) => (<div key={item.name} className="article-wrapper">
    <Link className="articleTitle" to={`${item.name}`}>
        {item.name}
    </Link>
        <p className="articleContent">{item.content[0].substring(0, 150)}...</p></div>))}</div>
);
}

export default ArticleList;