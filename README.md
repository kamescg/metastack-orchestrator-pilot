# hello-cli example

A minimal project with a complete, approvable planning package under `.orchestrator/projects/hello-cli/`:
two independent tracks (CLI entry point, shout formatting) and one dependent integration task across two milestones.

## Run it for real

```sh
cp -R examples/hello-cli ~/hello-cli && cd ~/hello-cli
git init -b main && git add -A && git commit -m "example baseline"
# create an empty GitHub repository, protect `main` (strict required checks, no approvals), then:
git remote add origin git@github.com:OWNER/hello-cli.git && git push -u origin main
# edit .orchestrator/config.json: github.repository = "OWNER/hello-cli"
orchestrator doctor
orchestrator approve hello-cli --revision <hash shown by: orchestrator plan --from .orchestrator/projects/hello-cli --project hello-cli>
orchestrator run hello-cli
```

The package here is already written, so `orchestrator plan` only needs to revise and review it (two planning invocations).

## Run the model-free demo

`examples/demo.sh` copies this project into a temporary directory, replaces the providers with the scripted fake provider and the GitHub backend with the local fake (a bare repository acting as `origin`), and runs `init → approve → run → report` through the real CLI. No model is called and nothing leaves the machine.

```sh
./examples/demo.sh
```
