import CountryFilter from '../CountryFilter';
import './styles.css'

const CountryFilters = () => {
  return (
    <div className="CountryFilters">
        <CountryFilter name={'All Locations'} />
        <CountryFilter name={'Miami'}         />
        <CountryFilter name={'Costa Rica'}    />
        <CountryFilter name={'Hawaii'}        />
        <CountryFilter name={'Spain'}         />
        <CountryFilter name={'Brazil'}        />
    </div>
  );
}

export default CountryFilters;
