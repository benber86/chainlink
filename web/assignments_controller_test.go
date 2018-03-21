package web_test

import (
	"testing"

	"github.com/smartcontractkit/chainlink/adapters"
	"github.com/smartcontractkit/chainlink/internal/cltest"
	"github.com/stretchr/testify/assert"
)

func TestAssignmentsController_Create_V1_Format(t *testing.T) {
	t.Parallel()
	app, cleanup := cltest.NewApplication()
	defer cleanup()

	j := cltest.FixtureCreateJobWithAssignmentViaWeb(t, app, "../internal/fixtures/web/v1_format_job.json")

	adapter1, _ := adapters.For(j.Tasks[0], app.Store)
	httpGet := adapter1.(*adapters.HTTPGet)
	assert.Equal(t, httpGet.URL.String(), "https://bitstamp.net/api/ticker/")
}
