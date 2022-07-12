import { useMemo, useEffect, useState } from "react";
import { State } from "utils/types";
import { connect } from "utils/globalContext";
import SpaceCard from "components/SpaceCard";
import { Space as SpaceType } from "utils/types";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import SpaceFactoryContract from "contracts/space_factory";
import SpaceContract from "contracts/space";
import SpaceQuery from "utils/spaceQuery";
import SpaceFactoryQuery from "utils/spaceFactoryQuery";

type Props = State & {};

const SpaceIndex = ({
  vcInstance,
  callContract,
  setState,
  viteApi,
  networkType,
}: Props) => {
  const connectedAccount = useMemo(() => vcInstance?.accounts[0], [vcInstance]);

  const contractQuery = useMemo(() => {
    if (viteApi) {
      console.log("viteApi", viteApi);
      return new SpaceFactoryQuery(
        viteApi,
        SpaceFactoryContract.address[networkType],
        SpaceFactoryContract.abi
      );
    }
  }, [viteApi]);

  const [spaces, spacesSet] = useState<Array<SpaceType>>([
    {
      address: "vite_f30697191707a723c70d0652ab80304195e5928dcf71fcab99",
      name: "test",
      memberCount: "52",
      isMember: true,
      // creator: string,
    },
  ]);

  useEffect(() => {
    if (contractQuery) {
      contractQuery.getSpacesPaging([0, 100]).then(async (res: any) => {
        const spacePromises = res.map(async (address: string) => {
          const cQuery = new SpaceQuery(viteApi, address, SpaceContract.abi);
          const spaceObj = await cQuery.getDetail(connectedAccount);

          return Object.assign({}, spaceObj, { id: address });
        });

        const spaceResult = await Promise.all(spacePromises);
        console.log("space result", spaceResult);

        spacesSet(
          spaceResult.filter(
            (item: any) => item !== undefined
          ) as Array<SpaceType>
        );
      });
    }
  }, [contractQuery]);

  return (
    <>
      <Box className="space-header">
        <Link to="/spaces/new">Create Space</Link>
      </Box>

      <Box className="spaces-wrapper">
        {spaces.map((item: SpaceType) => {
          return <SpaceCard space={item} key={`space-${item.address}`} />;
        })}
      </Box>
    </>
  );
};

export default connect(SpaceIndex);
