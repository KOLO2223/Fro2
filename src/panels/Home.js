import React from 'react';
import PropTypes from 'prop-types';
import { useState } from "react";

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Example</PanelHeader>
		{fetchedUser &&
		<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group>
	</Panel>
);


const MODAL_NAME = "filters";

const FILTERS_SIZE = [
  { value: 36, label: 36 },
  { value: 37, label: 37 },
  { value: 38, label: 38 },
  { value: 39, label: 39 },
];

const FILTERS_STYLE = [
  { value: "Вечерний", label: "Вечерний" },
  { value: "Деловой", label: "Деловой" },
  { value: "Повседневный", label: "Повседневный" },
  { value: "Спортивный", label: "Спортивный" },
];

const SubnavigationBarExample = () => {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivity();

  const [activePanel, setActivePanel] = useState("example");
  const [filtersModalOpened, setFiltersModalOpened] = useState(false);
  const [filtersCount, setFiltersCount] = useState(2);

  const [filterSizes, setFilterSizes] = useState([36]);
  const [filterStyles, setFilterStyles] = useState(["Вечерний"]);

  const [sizeSelected, setSizeSelected] = useState(false);
  const [inStockSelected, setInStockSelected] = useState(false);
  const [highRatingSelected, setHighRatingSelected] = useState(false);
  const [faveSelected, setFaveSelected] = useState(false);

  const openModal = () => {
    setFiltersModalOpened(true);
  };

  const closeModal = () => {
    setFiltersModalOpened(false);
  };

  const onChangeFilterSize = (e) => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      setFilterSizes([...filterSizes, +value]);
    } else {
      setFilterSizes(filterSizes.filter((v) => v !== +value));
    }
  };

  const onChangeFilterStyle = (e) => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      setFilterStyles([...filterStyles, value]);
    } else {
      setFilterStyles(filterStyles.filter((v) => v !== value));
    }
  };

  const applyFilters = () => {
    let count = 0;

    filterSizes.length && count++;
    filterStyles.length && count++;

    closeModal();
    setFiltersCount(count);
  };

  const modal = (
    <ModalRoot
      activeModal={filtersModalOpened ? MODAL_NAME : null}
      onClose={closeModal}
    >
      <ModalPage
        id={MODAL_NAME}
        header={
          <ModalPageHeader
            before={
              platform !== IOS && <PanelHeaderClose onClick={closeModal} />
            }
            after={
              platform === IOS && (
                <PanelHeaderButton onClick={closeModal}>
                  <Icon24Dismiss />
                </PanelHeaderButton>
              )
            }
          >
            Фильтры
          </ModalPageHeader>
        }
      >
        <FormLayout>
          <FormItem top="Размер">
            {FILTERS_SIZE.map(({ value, label }) => {
              return (
                <Checkbox
                  value={value}
                  checked={filterSizes.includes(value)}
                  onChange={onChangeFilterSize}
                >
                  {label}
                </Checkbox>
              );
            })}
          </FormItem>

          <FormItem top="Стиль">
            {FILTERS_STYLE.map(({ value, label }) => {
              return (
                <Checkbox
                  value={value}
                  checked={filterStyles.includes(value)}
                  onChange={onChangeFilterStyle}
                >
                  {label}
                </Checkbox>
              );
            })}
          </FormItem>

          <FormItem>
            <Button size="l" stretched onClick={applyFilters}>
              Показать результаты
            </Button>
          </FormItem>
        </FormLayout>
      </ModalPage>
    </ModalRoot>
  );

  return (
    <SplitLayout modal={modal}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Panel id="example">
            <PanelHeader>SubnavigationBar</PanelHeader>
            <Group>
            <SubnavigationBar>

                <SubnavigationButton
                  before={<Icon24Filter />}
                  selected={filtersCount > 0}
                  expandable
                  after={
                    filtersCount > 0 && (
                      <Counter mode="primary" size="s">
                        {filtersCount}
                      </Counter>
                    )
                  }
                  onClick={openModal}
                >
                  Фильтры
                </SubnavigationButton>

                
              </SubnavigationBar>
            </Group>

           
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

<SubnavigationBarExample />;

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
