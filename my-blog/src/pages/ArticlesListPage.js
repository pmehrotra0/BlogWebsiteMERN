import { articles } from "./ArticleContent";
import './ArticleList.css'
import ArticleList from "../components/ArticleList";
function ArticlesListPage() {
    return (<div>
        <h1>Articles !</h1>
        <div className="articleListWrapper">
            <ArticleList articles={articles} />
        </div>
    </div>);
}

export default ArticlesListPage;