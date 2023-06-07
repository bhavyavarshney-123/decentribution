package utils

import (
	"github.com/vrecan/death/v3"
	blockchain "matter/core"
	"os"
	"runtime"
	"syscall"
)

func CloseDB(chain *blockchain.Blockchain) {
	d := death.NewDeath(syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	d.WaitForDeathWithFunc(func() {
		defer os.Exit(1)
		defer runtime.Goexit()
		chain.Database.Close()
	})
}
