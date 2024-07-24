import ProfileDetailPage from "@/pagesComponents/profilePage/ProfilePage";
import CatalogPage from "@/pagesComponents/catalogPage/Catalog";

const Catalog = ({params}: {params:{catalogID: string}}) => {


    return (
        <div>
            <CatalogPage catalogID={params.catalogID}/>
        </div>
    )
}

export default Catalog;