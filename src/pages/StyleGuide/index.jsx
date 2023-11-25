import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'

const StyleGuide = () => {
  return (
    <div>
      <h1>StyleGuide</h1>
      <h2>Button</h2>
      <h3>Type</h3>
      <Button type="primary">Primary Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="default">Default Button</Button>
      <h3>Size</h3>
      <Button type="primary" size="small">
        Small Button
      </Button>
      <Button type="primary" size="default">
        Default Button
      </Button>
      <Button type="primary" size="large">
        Large Button
      </Button>
      <h3>Danger</h3>
      <Button type="primary" danger>
        Primary Button
      </Button>
      <Button type="text" danger>
        Text Button
      </Button>
      <Button type="default" danger>
        Default Button
      </Button>
      <h3>Transparent</h3>
      <Button type="primary">Primary Button</Button>
      <h3>Block</h3>
      <Button type="primary">Primary Button</Button>
      <h3>Loading</h3>
      <Button type="primary">Primary Button</Button>
      <hr />
      <h2>Checkbox</h2>
      <h3>Basic</h3>
      <Checkbox>Option 1</Checkbox>
      <Checkbox>Option 2</Checkbox>
      <h3>Size</h3>
      <Checkbox>Option 1</Checkbox>
      <Checkbox>Option 2</Checkbox>
      <hr />
      <h2>Radio</h2>
      <hr />
      <h2>Input</h2>
      <h3>Basic</h3>
      <h3>Size</h3>
      <h3>Disable</h3>
      <h3>Status</h3>
      <hr />
      <h2>Table</h2>
    </div>
  )
}

export default StyleGuide
