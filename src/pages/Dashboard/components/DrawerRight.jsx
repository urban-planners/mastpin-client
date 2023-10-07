import { useEffect, useState } from "react"
import "./Drawer.css"
import "./DrawerRight.css"

const DrawerRight = ({ assets, selected }) => {

  const [target, setTarget] = useState({})

  useEffect(() => {
    setTarget(() => {
      return assets.filter(asset => 
        selected.asset === `${asset.loc.lng} ${asset.loc.lat}`
      )?.[0] || {}
    })
  }, [selected, target])

  return (
    <div className="drawer right">
      <main>
        <div className="title">
          <small>Properties</small>
          <div className="line" />
        </div>
        <div className="content">
          {
            !Object.keys(target).length ? 
            <small className="na">Nothing to show.</small> :
            <form className="drawer__form">
              <label>
                Title
                <input value={target.title} />
              </label>
              <label>
                Population
                <input value={target.pop} />
              </label>
              <label>
                Longitude
                <input value={target.loc?.lng} />
              </label>
              <label>
                Latitude
                <input value={target.loc?.lat} />
              </label>
              <button hidden>Submit</button>
            </form>
          }
        </div>
      </main>
      <div className="landscape__container">
        <label className="landscape__container">
          <small>Preview</small>
          <canvas className="landscape__canvas" />
        </label>
      </div>
    </div>
  )
}

export default DrawerRight