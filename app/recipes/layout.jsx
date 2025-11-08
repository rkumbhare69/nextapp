

const RecipeLayout = ({recipes, latest}) => {
    return(
        <div className="recipies-page">
            <header>
                {recipes}
            </header>
            <main>
                {latest}
            </main>
        </div>
    )
}
export default RecipeLayout;