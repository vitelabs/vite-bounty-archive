import React from 'react';

export type setState = (state: object, meta?: { deepMerge?: boolean }) => void;

type HOCProps = {
  state: object;
  setState: setState;
};

// https://stackoverflow.com/a/58405003/13442719
const Context = React.createContext<HOCProps>(undefined!);

export const deepMerge = (target: { [key: string]: any }, source: { [key: string]: any }) => {
  if (target && source) {
    for (const key in source) {
      if (
        source[key] instanceof Object &&
        !Array.isArray(source[key]) // NB: DOES NOT DEEP MERGE ARRAYS
      ) {
        Object.assign(source[key], deepMerge(target[key] || {}, source[key]));
      }
    }
    Object.assign(target, source);
    return target;
  }
  return target || source;
};

type Props = {
  initialState?: object;
  onSetState?: (state: object, meta: { deepMerge?: boolean }) => void;
};

export class Provider extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = { ...(props.initialState || {}) };
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setState: this.reactOneSetState,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

  reactOneSetState = (data: object, meta: { deepMerge?: boolean } = {}) => {
    const { onSetState } = this.props;
    this.setState(
      (prevState) => (meta.deepMerge ? deepMerge({ ...prevState }, data) : { ...prevState, ...data }),
      () => {
        onSetState && onSetState(this.state, meta);
      }
    );
  };
  getState = () => this.state;
}

export const connect = (keys?: string | null) => {
  const mapStateToProps = (dict: object) => {
    switch (keys) {
      case undefined:
        return dict;
      case null:
        return {};
      default:
        // eslint-disable-next-line
        return eval(`({${keys}}) => ({${keys}})`)(dict);
    }
  };

  // https://stackoverflow.com/a/56989122/13442719
  return <T,>(Component: React.ComponentType<T>) =>
    (props: T) =>
      (
        <Context.Consumer>
          {(value) => <Component {...props} {...mapStateToProps(value.state)} setState={value.setState} />}
        </Context.Consumer>
      );
};
