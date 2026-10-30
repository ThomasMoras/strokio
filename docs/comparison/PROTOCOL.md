# Manual vs agent — comparison protocol (optional)

This is an optional protocol; no agent-vs-manual comparison is currently
planned. If a comparison is started, decide the protocol before the task and
change it only between tasks, recording changes below.

## Controlled variables
- Same feature spec, same contract version, same fixtures and test suite.
- Agent runs start from the tagged baseline commit `baseline/NNNN`.
- Agent runs use a fresh session and the identical prompt for every model.
- Use the same review and information constraints for each variant. Do not
  designate untracked or private source as a protected baseline without adding
  an explicit policy to `AGENTS.md` and `opencode.json`.

## Axes recorded per task
| Axis | Definition |
|---|---|
| Test pass rate | passing / total on first full run, and on final |
| Time to green | wall-clock from start to all gates passing |
| Diff size | LOC added + removed (`git diff --shortstat baseline/NNNN`) |
| Review corrections | changes you had to request or make after the first "done" |
| Tokens / cost | as reported by the tool, if available |
| Notes | anything qualitative |

## Results

| Spec | Variant | Model | Pass rate (first / final) | Time to green | Diff LOC | Corrections | Tokens | Notes |
|---|---|---|---|---|---|---|---|---|
| | manual | — | | | | | — | |
| | agent | | | | | | | |

## Protocol changes
- (none yet)
