import { constant } from "@vite/vitejs";
import {
  State,
  Proposal as ProposalType,
  Space as SpaceType,
} from "utils/types";
import { connect } from "utils/globalContext";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  Button,
  TextField,
} from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { shortenAddress, toSmallestUnit } from "utils/strings";
import SpaceQuery from "utils/spaceQuery";
import SpaceContract from "contracts/space";

type Props = State & {};

const ProposalShow = ({
  vcInstance,
  viteApi,
  callContract,
  setState,
}: Props) => {
  const { id, address } = useParams();

  const [space, spaceSet] = useState<SpaceType>();
  const [proposal, proposalSet] = useState<ProposalType>({
    id: "string",
    title: "string",
    description: "string",
    proposer: "string",
    voteStart: "string",
    voteEnd: "string",
    executed: "string",
    canceled: "string",
  });
  const [voteValue, voteValueSet] = useState<string>("");
  const [voted, votedSet] = useState<{
    forVotes?: number;
    againstVotes?: number;
  }>({});
  const [amount, amountSet] = useState<string>("");
  const [accountBalance, accountBalanceSet] = useState<{
    balance: string;
    unreceived: string;
  } | null>();

  if (!address) return <></>;

  const connectedAccount = useMemo(() => vcInstance?.accounts[0], [vcInstance]);
  const query = new SpaceQuery(viteApi, address, SpaceContract.abi);

  useEffect(() => {
    if (!viteApi) return;

    if (id) {
      query.getProposal([id]).then((res: any) => {
        proposalSet(res as ProposalType);
      });

      query.getVotes([id]).then((res: any) => {
        votedSet(res as { forVotes?: number; againstVotes?: number });
      });
    }

    if (connectedAccount) {
      query.getDetail(connectedAccount).then((res) => {
        spaceSet(res as SpaceType);
      });

      viteApi.getBalanceInfo(connectedAccount).then((res: any) => {
        console.log("get balance info", res);
        accountBalanceSet(res);

        if (accountBalance) {
          console.log("accountBalance", accountBalance);
        }
      });
    }
  }, [viteApi]);

  const formatDate = useCallback((timestamp?: string): string => {
    return timestamp
      ? moment(parseInt(timestamp) * 1000).format("YYYY/MM/DD")
      : "";
  }, []);

  const proposalState =
    proposal?.executed === "1"
      ? "Exceuted"
      : proposal?.canceled === "1"
      ? "Canceled"
      : "Active";

  const handleChange = useCallback((event: any) => {
    voteValueSet(event.target.value);
  }, []);

  const voteProposal = () => {
    if (!connectedAccount || (space && !space.isMember)) {
      setState({ toast: "please log in" });
      return;
    }

    callContract(
      SpaceContract,
      "castVote",
      [address, voteValue],
      constant.Vite_TokenId,
      toSmallestUnit(amount, constant.Vite_Token_Info.decimals)
    )
      .then(() => {
        console.log("vote success");
        setState({ toast: "123" });
      })
      .catch(() => {
        console.log("vote fail");
        setState({ toast: "456" });
      });
  };

  const amountChange = (newValue: any) => {
    return amountSet(newValue.target.value);
  };

  return proposal ? (
    <>
      <Box className="proposal-show">
        <Link className="link-back" to={`/spaces/${address}/proposals`}>
          <ArrowBackIcon />
          <span>Back</span>
        </Link>

        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Paper className="proposal-content">
              <h3>{proposal?.title}</h3>
              <div className="meta">
                <span className="state">{proposalState}</span>
                <span>
                  by <em>{shortenAddress(proposal.proposer)}</em>
                </span>
              </div>

              <div className="desc-wrapper">
                <h3>Description</h3>
                <div className="desc">{proposal?.description}</div>
              </div>
            </Paper>

            <Paper className="vote">
              <h3>Cast your vote</h3>

              <div className="vote-content">
                <FormControl fullWidth>
                  <RadioGroup
                    className="vote-options-group"
                    value={voteValue}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="For"
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Against"
                    />
                  </RadioGroup>

                  <TextField
                    id="amount"
                    value={amount}
                    onChange={amountChange}
                    label="Amount"
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>

                <div className="action-wrapper">
                  <Button
                    className="btn-vote"
                    onClick={voteProposal}
                    variant="contained"
                  >
                    Vote
                  </Button>
                </div>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className="proposal-card">
              <h3>Information</h3>

              <List>
                <ListItem
                  className="proposal-card-item"
                  alignItems="flex-start"
                >
                  <span className="label">Start Time</span>
                  <span>{formatDate(proposal?.voteStart)}</span>
                </ListItem>
                <ListItem
                  className="proposal-card-item"
                  alignItems="flex-start"
                >
                  <span className="label">End Time</span>
                  <span>{formatDate(proposal?.voteEnd)}</span>
                </ListItem>
              </List>
            </Paper>

            <Paper className="proposal-card">
              <h3>Result</h3>

              <List>
                <ListItem
                  className="proposal-card-item"
                  alignItems="flex-start"
                >
                  <span className="label">For</span>
                  <span>{voted.forVotes}</span>
                </ListItem>
                <ListItem
                  className="proposal-card-item"
                  alignItems="flex-start"
                >
                  <span className="label">Against</span>
                  <span>{voted.againstVotes}</span>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  ) : (
    <span>loading</span>
  );
};

export default connect(ProposalShow);
