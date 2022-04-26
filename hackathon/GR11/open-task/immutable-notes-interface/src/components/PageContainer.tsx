import React, { useState, useCallback, useMemo } from 'react';
import ConnectButton from '../containers/ConnectButton';
import A from './A';
import { wallet } from '@vite/vitejs';
import TextInput from './TextInput';
import { isValidHash } from '../utils/misc';
import { useTitle } from '../utils/hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import Hamburger from './Hamburger';
import ExternalLinkIcons from './ExternalLinkIcons';
import { connect } from '../utils/wep-state';
import { State } from '../utils/types';
import DisconnectButton from '../containers/DisconnectButton';
import AccountButton from '../containers/AccountButton';
import RecordButton from '../containers/RecordButton';

type Props = State &
  RouteComponentProps & {
    title?: string;
    children: React.ReactNode;
  };

const PageContainer = ({ vbInstance, title, children, history }: Props) => {
  useTitle(title);
  const [query, querySet] = useState('');
  const [menuOpen, menuOpenSet] = useState(false);

  const search = useCallback(() => {
    const isAddress = wallet.isValidAddress(query);
    if (isAddress || isValidHash(query)) {
      history.push(`/${isAddress ? 'address' : 'hash'}/${query}`);
    } else if (query) {
      window.alert('Invalid hash or address');
    }
  }, [history, query]);

  const searchBar = useMemo(
    () => (
      <form
        action="." // https://stackoverflow.com/a/26287843/13442719
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
        className="rounded overflow-hidden flex flex-1"
      >
        <TextInput
          value={query}
          onUserInput={(v) => querySet(v.replace(/\s/g, ''))}
          className="w-full p-2 md:py-1 text-lg bg-gray-100"
          placeholder="Search hashes or addresses"
        />
        <button className="px-3 bg-gray-200 hidden md:block">Search</button>
      </form>
    ),
    [query, querySet, search]
  );

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="flex mx-auto justify-between items-center max-w-5xl md:p-4">
          <Hamburger open={menuOpen} onChange={(b) => menuOpenSet(b)} />
          <A to="/" className="text-3xl font-extrabold md:m-0 md:mr-4">
            Immutable Notes
          </A>
          <div className="w-12 md:hidden xy">{vbInstance && <RecordButton icon className="text-blue-500" />}</div>
          <div className="hidden md:flex md:flex-1 max-w-md">{searchBar}</div>
        </div>
      </header>
      {menuOpen && (
        <>
          <div className="z-10 bg-tinted md:hidden absolute h-screen w-screen" onClick={() => menuOpenSet(false)} />
          <div className="z-10 bg-white md:hidden absolute w-screen shadow">
            {searchBar}
            {vbInstance ? (
              <AccountButton className="menu-button" />
            ) : (
              <ConnectButton menu onConnect={() => menuOpenSet(false)} />
            )}
            <A href="https://immutablenotes.com" className="menu-button">
              Info
            </A>
            <A href="https://github.com/ImmutableNotes" className="menu-button">
              GitHub
            </A>
            <A href="https://twitter.com/ImmutableNotes" className="menu-button">
              Twitter
            </A>
            <A href="https://discord.gg/bXQYtJxq3s" className="menu-button">
              Discord
            </A>
            {vbInstance && <DisconnectButton className="menu-button" />}
          </div>
        </>
      )}
      <div className="flex mx-auto max-w-5xl p-4 md:p-5">
        <div className="space-y-8 mr-8 hidden md:block">
          {vbInstance ? (
            <div>
              <RecordButton className="rect primary mb-2" />
              <AccountButton className="font-semibold" />
            </div>
          ) : (
            <ConnectButton />
          )}
          <ExternalLinkIcons />
          {vbInstance && <DisconnectButton className="font-semibold text-lg" />}
        </div>
        <main className="space-y-4 flex-1 bg-white p-4 rounded shadow">{children}</main>
      </div>
    </div>
  );
};

export default connect('vbInstance')(withRouter(PageContainer));
