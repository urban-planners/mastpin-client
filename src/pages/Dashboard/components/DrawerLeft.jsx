import { nanoid } from "nanoid"
import "./Drawer.css"
import "./DrawerLeft.css"

const DrawerLeft = ({ assets=[], selected, setSelected }) => {

    const assetClicked = (asset) => {
        setSelected(prev => ({
            ...prev,
            asset: `${asset.loc.lng} ${asset.loc.lat}`
        }))
    }

  return (
    <div className="drawer left">
        <div className="title">
            <small>Assets</small>
            <div className="line" />
        </div>
        <div className="content">
            <ul>
                {
                    !assets.length ? <small className="na">Nothing to show.</small> :
                    assets.map(asset => (
                        <li
                            key={nanoid()}
                            onClick={() => assetClicked(asset)}
                            className={
                                `${selected.asset === `${asset.loc.lng} ${asset.loc.lat}` ?
                                "selected" : ""
                            }`}
                        >
                            { asset.title }
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default DrawerLeft