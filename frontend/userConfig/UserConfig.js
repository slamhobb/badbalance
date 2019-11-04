import React from 'react';

import { setDefaultPageFastSpending, getUserConfig } from '../services/userConfigService';

class UserConfig extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeDefaultPageFastSpending = this.handleChangeDefaultPageFastSpending.bind(this);

        this.state = {
            defaultPageFastSpending: false
        };
    }

    componentDidMount() {
        getUserConfig()
            .then(result => {
                this.setState({
                    defaultPageFastSpending: result.config.default_page_fast_spending
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleChangeDefaultPageFastSpending(e) {
        const checked = e.target.checked;

        setDefaultPageFastSpending(checked)
            .then(() => {
                this.setState({
                    defaultPageFastSpending: checked
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));

    }

    render() {
        return (
            <div className="row mt-4">
                <div className="col">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                            checked={this.state.defaultPageFastSpending}
                            onChange={this.handleChangeDefaultPageFastSpending} />
                        <label className="form-check-label">Открывать страницу &quot;Быстрый расход&quot; по-умолчанию</label>
                    </div>
                </div>
            </div>
        );
    }
}

UserConfig.propTypes = {

};

export default UserConfig;
