import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
	Bridge,
	Container,
  Legend,
  InputText,
  Dialog
} from '../../src';

function Demo () {
  const refComponent = useRef(null);
  useEffect(() => {
    console.log(refComponent)
	}, [])


	const [checked, setChecked] = useState(false);

	function onClick (e, curentChecked) {
		setChecked(!curentChecked);
	}

  return <Page>
    <Header>
      <Titlebar caption="标题"/>
    </Header>
		<Container>
			<Legend ref={refComponent} className="success">aa</Legend>
      <InputText placeholder="hh" liconAttribute={{className: 'icon-plus', onClick: () => console.log(1)}} riconAttribute={{className: 'icon-plus', onClick: () => console.log(2)}}/>
      <Dialog show>
        asdfasdfaf
      </Dialog>
		</Container>
  </Page>
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
