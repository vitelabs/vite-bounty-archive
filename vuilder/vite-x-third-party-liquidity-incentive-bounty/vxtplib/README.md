# VXTPLIB - ViteX Third-Party Liquidity Incentive Bounty

VXTPLIB is a command line program that can scan for user trades and resting limit orders on ViteX, for the given markets and time period, and distribute rewards to incentivise trading and market making.

## Getting started

1. Install the Dart SDK from <https://dart.dev/get-dart>
2. Clone project repository - `git clone https://github.com/azbuky/vxtplib`
3. Run `dart pub get` to fetch dependencies
4. Run `dart run bin/vxtplib.dart --help` to see available options

### Sample scan command

```sh
dart run bin/vxtplib.dart scan --node ws://localhost:41420 --tradePairs VITC-000_VITE,VITE_BTC-000 --startTime <UNIX_TIME> --endTime <UNIX_TIME>
```

### Sample distribute command

```sh
dart run bin/vxtplib.dart config
dart run bin/vxtplib.dart distribute --node ws://localhost:41420
```

For more details

```sh
dart run bin/vxtplib.dart help
```

NOTE: Depending on the time interval, VXTPLIB can potentially fetch a lot of data from the Vite node, so it is recommanded to connect to a local node.

## Supported platforms

VXTPLIB can run on any platform where the Dart SDK is available (Windows, Linux and macOS) and can be compiled to a target platform executable. For more details see <https://dart.dev/tools/dart-compile>.

## Compiling program executable

It is possible to compile to a stand-alone, platform specific, executable by running `dart compile exe bin/vxtplib.dart -o <EXECUTABLE_NAME>`.

Then use the executable instead of `dart run bin/vxtplib.dart`

## License

VXTPLIB is released under the MIT license.
