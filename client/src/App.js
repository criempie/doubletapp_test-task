import React, {Component} from 'react';

import Header from './Header/index.js';
import Button from './Button/index.js';
import SearchLine from './SearchLine/index.js';
import TableStudents from './TableStudents/index.js';
import ButtonToMainPage from './ButtonToMainPage/index.js';
import Form from './Form/index.js';

import './fonts/Geometria/stylesheet.css';
import './App.css';
import SortSelect from './CustomSelect/SortSelect.js'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMainPage: true,
      search: "",
      sort: ['ФИО', false],
      specialtyOptions: {
        PI: "Прикладная информатика",
        PM: "Прикладная математика",
        MC: "Механика",
        MT: "Математика",
        KN: "Компьютерные науки",
        FT: "Фундаметальная информатика"
      },

      sortOptions: [
        "ФИО",
        "Рейтинг",
        "Группа",
        "Возраст",
        "Любимый цвет",
      ], 

      colorsOptions: [
        '#49C2E8',
        '#E25B5B',
        '#83C872',
        '#F7FB53',
        '#000000',
        '#EFA638',
        '#rainbow',
      ],

      groupOptions: {
        PI: [
          'ПИ-101', 'ПИ-102', 'ПИ-201', 'ПИ-213'
        ],

        PM: [
          'ПМ-101', 'ПМ-102', 'ПМ-201', 'ПМ-213'
        ],

        MC: [
          'МХ-101', 'МХ-102', 'МХ-201', 'МХ-213'
        ],

        MT: [
          'МТ-101', 'МТ-102', 'МТ-201', 'МТ-213'
        ],

        KN: [
          'КН-101', 'КН-102', 'КН-201', 'КН-213'
        ],

        FT: [
          'ФИИТ-101', 'ФИИТ-102', 'ФИИТ-201', 'ФИИТ-213'
        ],

      },

      sexOptions: [
        "Мужской",
        "Женский",
      ],

    }

    this.switchPages = this.switchPages.bind(this);
  }
  
  switchPages = () => this.setState({isMainPage: !this.state.isMainPage});

  render() {
    return (
      <div>
        <Header />

        {this.state.isMainPage ? this.renderMainPage() : this.renderAddStudentPage()}

      </div>
    );
  }

  getValue = (stateName=null, value=null) => {
    this.setState({[stateName]: value});
    console.log('state: ', this.state)
	}

  renderMainPage() {
    return (
      <div className="container">
        <div className="container-h2-additions">
        <h2>Студенты</h2>
          <Button label="Добавить студента" imagePath="./images/add.svg" OnClick={this.switchPages} />
        </div>
        <div className="container-tools">
          <SearchLine getValue={this.getValue} />
          <SortSelect options={this.state.sortOptions} 
                      value="ФИО"
                      name="sort" 
                      getValue={this.getValue}/>
        </div>
        <TableStudents search={this.state.search}
                       sortSettings={this.state.sort} />
      </div>
    );
  }

  renderAddStudentPage() {
    return (
      <div>
        
        <div className="container">
          <div className="container-h2-additions">
            <h2>Новый студент</h2>
          </div>

          <Form func={this.switchPages} />

          {/* <div className="avatarchange-container">
              <AvatarChange />
          </div>

          <div className="subcontainer-container">

            <div className="subcontainer">
              <InputText label="ФИО" placeholder="Иванов Иван Иванович" />
              <InputText label="Email" placeholder="ivanov@gmail.com" />
              <CustomSelect label="Специальность" options={this.state.specialtyOptions} selected="Выбрать"/>
              <CustomSelect label="Группа" options={this.state.groupOptions} selected="Выбрать" />
              <InputText label="Рейтинг" placeholder="0" />
              <Button label="Создать" />
            </div>

            <div className="subcontainer">
              <CustomSelect label="Пол" selected="Выбрать" options={this.state.sexOptions} />
              <ColorSelect label="Любимый цвет" selected="Выбрать" options={this.state.colorsOptions} type="colorSelect" />
            </div>

            <div className="subcontainer"></div>

          </div> */}

        </div>
        <ButtonToMainPage OnClick={this.switchPages} />
      </div>
    );
  }

}

export default App;
